function t() {
   // initialising the array of elements
   var Array1 = [10, 20, 30, 40, 50, 60];
   var Array2 = [1, 2];
   var Array3 = [0, 1.5, 6.8];
   var Array4 = [.8, .08, .008];

   // Calling to d3.max() function
   A = d3.max(Array1);
   B = d3.max(Array2);
   C = d3.max(Array3);
   D = d3.min(Array4);

   // Getting maximum value
   document.write("<h3>Testanto d3.sj</h3>")
   document.write("[10, 20, 30, 40, 50, 60] => max: " + A + "<br>");
   document.write("[1, 2] => max: " + B + "<br>");
   document.write("[0, 1.5, 6.8] => max: " + C + "<br>");
   document.write("[.8, .08, .008] => min: " + D + "<br>");

   return alert("Renato")
}