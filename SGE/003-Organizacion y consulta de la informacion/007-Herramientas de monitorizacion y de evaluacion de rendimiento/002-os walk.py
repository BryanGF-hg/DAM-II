import os

for archivo,carpeta,carpetas in os.walk("/var/www/html/@CEAC"):
  print(archivo)
  print(carpeta)
  print(carpetas)
  
