
cd  D:\github\Bridge.CustomUIMarkup\bin\js\

for %%f in (*.js) do java -jar D:\github\Bridge.CustomUIMarkup\Build\compiler.jar --js %%f --js_output_file %%~nf.min.js

pause