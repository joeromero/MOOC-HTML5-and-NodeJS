var pan = {blanco:6, de_ajo:5, integral:{de_semillas:{de_avena:3, de_lino:4}}}; 
leche = {entera:4, semi_desnatada:3, desnatada:5}; 
delete pan.de_ajo; 

console.log(pan['integral'].de_semillas);