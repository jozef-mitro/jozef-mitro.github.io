# Specify the path to the file
$filePath = "notes"

# Read the file line by line
$content = Get-Content -Path $filePath

# Iterate through each line
foreach ($line in $content) {
    # Split the line into separate values using whitespace as the delimiter
    # Except the THAC0 should include the [] after the number
    $values = $line -split '\s+(?=\d+\[)'

    # Access the individual values
    $level = $values[0]
    $xp = [int]$values[1]
    $hd = $values[2]
    $thac0 = $values[3]
    $d = $values[4]
    $w = $values[5]
    $p = $values[6]
    $b = $values[7]
    $s = $values[8]
    $abilities = $values[9..13]

    # Process the values as needed
    # ...

    # Output the values or perform further actions
    Write-Host "Level: $level, XP: $xp, HD: $hd, THAC0: $thac0, D: $d, W: $w, P: $p, B: $b, S: $s, Abilities: $abilities"
}