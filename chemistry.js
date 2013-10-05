var element_list = "1 - H - Hydrogen\n2 - He - Helium\n3 - Li - Lithium\n4 - Be - Beryllium\n5 - B - Boron\n6 - C - Carbon\n7 - N - Nitrogen\n8 - O - Oxygen\n9 - F - Fluorine\n10 - Ne - Neon\n11 - Na - Sodium\n12 - Mg - Magnesium\n13 - Al - Aluminum, Aluminium\n14 - Si - Silicon\n15 - P - Phosphorus\n16 - S - Sulfur\n17 - Cl - Chlorine\n18 - Ar - Argon\n19 - K - Potassium\n20 - Ca - Calcium\n21 - Sc - Scandium\n22 - Ti - Titanium\n23 - V - Vanadium\n24 - Cr - Chromium\n25 - Mn - Manganese\n26 - Fe - Iron\n27 - Co - Cobalt\n28 - Ni - Nickel\n29 - Cu - Copper\n30 - Zn - Zinc\n31 - Ga - Gallium\n32 - Ge - Germanium\n33 - As - Arsenic\n34 - Se - Selenium\n35 - Br - Bromine\n36 - Kr - Krypton\n37 - Rb - Rubidium\n38 - Sr - Strontium\n39 - Y - Yttrium\n40 - Zr - Zirconium\n41 - Nb - Niobium\n42 - Mo - Molybdenum\n43 - Tc - Technetium\n44 - Ru - Ruthenium\n45 - Rh - Rhodium\n46 - Pd - Palladium\n47 - Ag - Silver\n48 - Cd - Cadmium\n49 - In - Indium\n50 - Sn - Tin\n51 - Sb - Antimony\n52 - Te - Tellurium\n53 - I - Iodine\n54 - Xe - Xenon\n55 - Cs - Cesium\n56 - Ba - Barium\n57 - La - Lanthanum\n58 - Ce - Cerium\n59 - Pr - Praseodymium\n60 - Nd - Neodymium\n61 - Pm - Promethium\n62 - Sm - Samarium\n63 - Eu - Europium\n64 - Gd - Gadolinium\n65 - Tb - Terbium\n66 - Dy - Dysprosium\n67 - Ho - Holmium\n68 - Er - Erbium\n69 - Tm - Thulium\n70 - Yb - Ytterbium\n71 - Lu - Lutetium\n72 - Hf - Hafnium\n73 - Ta - Tantalum\n74 - W - Tungsten\n75 - Re - Rhenium\n76 - Os - Osmium\n77 - Ir - Iridium\n78 - Pt - Platinum\n79 - Au - Gold\n80 - Hg - Mercury\n81 - Tl - Thallium\n82 - Pb - Lead\n83 - Bi - Bismuth\n84 - Po - Polonium\n85 - At - Astatine\n86 - Rn - Radon\n87 - Fr - Francium\n88 - Ra - Radium\n89 - Ac - Actinium\n90 - Th - Thorium\n91 - Pa - Protactinium\n92 - U - Uranium\n93 - Np - Neptunium\n94 - Pu - Plutonium\n95 - Am - Americium\n96 - Cm - Curium\n97 - Bk - Berkelium\n98 - Cf - Californium\n99 - Es - Einsteinium\n100 - Fm - Fermium\n101 - Md - Mendelevium\n102 - No - Nobelium\n103 - Lr - Lawrencium\n104 - Rf - Rutherfordium\n105 - Db - Dubnium\n106 - Sg - Seaborgium\n107 - Bh - Bohrium\n108 - Hs - Hassium\n109 - Mt - Meitnerium\n110 - Ds - Darmstadtium\n111 - Rg - Roentgenium\n112 - Cn - Copernicium\n113 - Uut - Ununtrium\n114 - Fl - Flerovium\n115 - Uup - Ununpentium\n116 - Lv - Livermorium\n117 - Uus - Ununseptium\n118 - Uuo - Ununoctium";

var elements = [];

var lines = element_list.split('\n');

A = [[3,0,-1,0],[8,0,0,-2],[0,2,-2,-1],[1,0,0,0]];
b = [[0],[0],[0],[1]];

x = numeric.solve(A,b);
// console.log(x);

for(var i=0; i<lines.length; i++)
{
  var infos = lines[i].split(' - ');
  elements.push(new Element({abbreviation: infos[1], full_name: infos[2]}));
}

function elements_eq(el1, el2)
{
  return el1.abbreviation == el2.abbreviation;
}

function Element(params) {
  if(!params)
    params = {};
  this.abbreviation = params.abbreviation;
  if(!this.abbreviation)
    this.abbreviation = "";
  this.full_name = params.full_name;
  if(!this.full_name)
    this.full_name = "";
}

function Term() {
  this.term_str = "";
  this.coefficient = 1;
  this.element = null;
}

function ChemistryProcessor (equation) {
  if(!equation)
    return null;
  this.equation_str = equation;
  var sides = this.equation_str.split('=');
  if(sides.length != 2)
    return null;
  
  this.left_side = [];
  this.right_side = [];

  var left_side_terms = sides[0].split('+');
  var right_side_terms = sides[1].split('+');

  this.balanced = function() {

  };
}


$(document).ready(function() {
  $("#submit-btn").on("click", function() {
    var cp = new ChemistryProcessor($("#eqn-field").val());
    $("#output").text(cp.balanced());
  });
});