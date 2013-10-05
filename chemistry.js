function ChemistryProcessor (equation) {
  if(!equation)
    return null;

  original_equation = equation;

  console.log("Before: " + equation);
  Re = /[A-Z][a-z]?\d/g;
  while(m = Re.exec(equation))
  {
    var coefficient = parseInt(m[0].match(/\d/));
    payload = ""
    for(var c=0; c<coefficient; c++)
      payload += m[0].match(/[A-Z][a-z]*/g);

    var eqn_backup = equation;
    equation = eqn_backup.substring(0, m.index) + payload.replace(/\d/, "") + eqn_backup.substring(m.index + m[0].length, eqn_backup.length);
  }
  console.log("After: " + equation);

  this.equation_str = equation;
  var sides = this.equation_str.split("=");
  if(sides.length != 2)
  {
    console.log("invalid equation");
    return null;
  }

  var dupelements = equation.match(/[A-Z][a-z]*/g);
  var elements = dupelements.filter(function(elem, pos) {
    return dupelements.indexOf(elem) == pos;
  })

  var eqn_matrix = [];

  var left_side_terms = sides[0].replace(/\s/, "").split('+');
  var right_side_terms = sides[1].replace(/\s/, "").split('+');

  for(var i=0; i<elements.length; i++)
  {
    var new_row = [];
    for(var c=0; c<left_side_terms.length; c++)
    {
      var Re = new RegExp(elements[i], "g");
      var m = left_side_terms[c].match(Re);
      if(!m)
        new_row.push(0);
      else
        new_row.push(m.length);
    }
    for(var c=0; c<right_side_terms.length; c++)
    {
      var Re = new RegExp(elements[i], "g");
      var m = right_side_terms[c].match(Re);
      if(!m)
        new_row.push(0);
      else
        new_row.push(-m.length);
    }
    console.log(new_row);
    eqn_matrix.push(new_row);
  }

  var nterms = left_side_terms.length + right_side_terms.length;
  var done = false;

  for(var i=1; i<10 && !done; i++)
  {
    // give up after 10 attempts
    for(var c=0; c<nterms && !done; c++)
    {
      var test_matrix = eqn_matrix;
      var new_row = [];
      for(var z=0; z<nterms; z++)
      {
        if(z == c)
          new_row.push(1);
        else
          new_row.push(0);
      }
      test_matrix.push(new_row);
      var b = [];
      for(var z=0; z<nterms - 1; z++)
        b.push(0);
      b[nterms - 1] = i;
      console.log(test_matrix);
      console.log(b);
      x = numeric.solve(test_matrix,b);
      done = true;
      for(var z=0; z<x.length; z++)
      {
        if(x[z] % 1 != 0 || x[z] == 0)
          done = false;
      }
      test_matrix.pop();
    }
  }





  console.log(x);

  var sides = original_equation.split("=");
  var inp_left_terms = sides[0].split("+");
  var inp_right_terms = sides[1].split("+");

  if(x[0] == 1)
    this.balanced = inp_left_terms[0];
  else
    this.balanced = x[0] + "(" + inp_left_terms[0] + ")";
  for(var i=1; i<inp_left_terms.length; i++)
  {
    if(x[i] == 1)
      this.balanced += " + " + inp_left_terms[i];
    else
      this.balanced += " + " + x[i] + "(" + inp_left_terms[i] + ")"
  }

  this.balanced += " = ";

  if(x[inp_left_terms.length] == 1)
    this.balanced += inp_right_terms[0];
  else
    this.balanced += x[inp_left_terms.length] + "(" + inp_right_terms[0] + ")";
  for(var i=1; i<inp_right_terms.length; i++)
  {
    if(x[i+inp_left_terms.length] == 1)
      this.balanced += " + "  + inp_right_terms[i];
    else
      this.balanced += " + " + x[i + inp_left_terms.length] + "(" + inp_right_terms[i] + ")";
  }
}


$(document).ready(function() {
  $("#submit-btn").on("click", function() {
    var cp = new ChemistryProcessor($("#eqn-field").val());
    $("#output").text(cp.balanced);
  });
});