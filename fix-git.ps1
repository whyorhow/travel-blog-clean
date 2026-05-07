Set-Location "c:\Users\benji\travel-blog-clean"
Write-Host "Adding SaoPauloRefactored.js..."
git add src/pages/SaoPauloRefactored.js
Write-Host "Committing..."
git commit -m "fix: add missing SaoPauloRefactored.js"
Write-Host "Pushing..."
git push
Write-Host "Done!"
