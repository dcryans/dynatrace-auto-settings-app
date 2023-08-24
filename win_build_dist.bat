call create-archive.bat

cd out
xcopy /Y /s ..\src\assets\icon.png .\

7z.exe a artifact.zip icon.png

del icon.png

del auto-settings-app.zip

ren artifact.zip auto-settings-app.zip

cd ..