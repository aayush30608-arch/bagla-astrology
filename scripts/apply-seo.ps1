<#
================================================================================
DIVYA DRISHTI - SEO METADATA AUTO-SYNC SCRIPT
Domain: https://divyadrishtiastroai.in
Applies SEO Catalog metadata (Titles, Descriptions, Canonical, OG, Twitter, 
Robots, and JSON-LD Schemas) into all 42 HTML files.
================================================================================
#>

[CmdletBinding()]
param(
    [string]$CatalogPath = "",
    [string]$HtmlDir = "",
    [switch]$DryRun
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $scriptDir) { $scriptDir = "d:\astro\scripts" }

if (-not $CatalogPath) {
    $CatalogPath = Join-Path (Split-Path -Parent $scriptDir) "js\seo-catalog.json"
}
if (-not $HtmlDir) {
    $HtmlDir = Split-Path -Parent $scriptDir
}

$ErrorActionPreference = "Stop"

if (-not (Test-Path $CatalogPath)) {
    Write-Error "Catalog file not found at: $CatalogPath"
    exit 1
}

$catalog = Get-Content $CatalogPath -Raw -Encoding UTF8 | ConvertFrom-Json
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "DIVYA DRISHTI - BATCH SEO SYNC ENGINE" -ForegroundColor Yellow
Write-Host "Total Pages to Sync: $($catalog.Count)" -ForegroundColor White
Write-Host "Target Directory: $HtmlDir" -ForegroundColor White
if ($DryRun) {
    Write-Host "[MODE: DRY RUN - NO FILES WILL BE MODIFIED]" -ForegroundColor Magenta
}
Write-Host "================================================================================" -ForegroundColor Cyan

$successCount = 0
$skipCount = 0
$errorCount = 0

function Generate-SchemaJson($item) {
    $schemaType = if ($item.schemaType) { $item.schemaType } else { "AstrologyService" }
    
    switch ($schemaType) {
        "AboutPage" {
            $schemaObj = @{
                "@context" = "https://schema.org"
                "@type" = "AboutPage"
                "name" = $item.title
                "url" = $item.url
                "description" = $item.description
                "mainEntity" = @{
                    "@type" = "Person"
                    "name" = "Shastri Amit Kumar Sharma"
                    "jobTitle" = "Vedic Astrologer & Maa Baglamukhi Upasak"
                    "description" = "Over 30 years of authentic Vedic astrology, palmistry, and sacred Anushthans in Jaipur."
                    "worksFor" = @{
                        "@type" = "Organization"
                        "name" = "Divya Drishti (Apke Sitare • Aapki Disha)"
                        "url" = "https://divyadrishtiastroai.in"
                    }
                }
            }
        }
        "ContactPage" {
            $schemaObj = @{
                "@context" = "https://schema.org"
                "@type" = "ContactPage"
                "name" = $item.title
                "url" = $item.url
                "description" = $item.description
                "mainEntity" = @{
                    "@type" = "Organization"
                    "name" = "Divya Drishti (Apke Sitare • Aapki Disha)"
                    "telephone" = "+91-9829034000"
                    "address" = @{
                        "@type" = "PostalAddress"
                        "addressLocality" = "Jaipur"
                        "addressRegion" = "Rajasthan"
                        "addressCountry" = "IN"
                    }
                }
            }
        }
        "WebApplication" {
            $schemaObj = @{
                "@context" = "https://schema.org"
                "@type" = "WebApplication"
                "name" = $item.name
                "url" = $item.url
                "description" = $item.description
                "applicationCategory" = "Astrology & Lifestyle"
                "operatingSystem" = "Web Browser, All Devices"
                "offers" = @{
                    "@type" = "Offer"
                    "price" = "0"
                    "priceCurrency" = "INR"
                }
            }
        }
        "Service" {
            $schemaObj = @{
                "@context" = "https://schema.org"
                "@type" = "Service"
                "name" = $item.name
                "serviceType" = "Vedic Anushthan & Puja"
                "description" = $item.description
                "provider" = @{
                    "@type" = "AstrologyService"
                    "name" = "Divya Drishti"
                    "url" = "https://divyadrishtiastroai.in"
                }
                "areaServed" = @{
                    "@type" = "Country"
                    "name" = "India"
                }
            }
        }
        "Article" {
            $schemaObj = @{
                "@context" = "https://schema.org"
                "@type" = "Article"
                "headline" = $item.title
                "description" = $item.description
                "image" = $item.ogImage
                "author" = @{
                    "@type" = "Person"
                    "name" = "Shastri Amit Kumar Sharma"
                }
                "publisher" = @{
                    "@type" = "Organization"
                    "name" = "Divya Drishti"
                    "logo" = @{
                        "@type" = "ImageObject"
                        "url" = "https://divyadrishtiastroai.in/images/logo.png"
                    }
                }
            }
        }
        Default {
            # AstrologyService / Organization
            $schemaObj = @{
                "@context" = "https://schema.org"
                "@type" = "AstrologyService"
                "name" = "Divya Drishti - Apke Sitare • Aapki Disha"
                "alternateName" = "Divya Drishti Astro AI"
                "url" = "https://divyadrishtiastroai.in/"
                "logo" = "https://divyadrishtiastroai.in/images/logo.png"
                "image" = $item.ogImage
                "description" = $item.description
                "founder" = @{
                    "@type" = "Person"
                    "name" = "Shastri Amit Kumar Sharma"
                    "jobTitle" = "Vedic Astrologer & Maa Baglamukhi Upasak"
                }
                "address" = @{
                    "@type" = "PostalAddress"
                    "addressLocality" = "Jaipur"
                    "addressRegion" = "Rajasthan"
                    "addressCountry" = "IN"
                }
                "telephone" = "+91-9829034000"
                "sameAs" = @(
                    "https://www.facebook.com",
                    "https://www.instagram.com"
                )
            }
        }
    }
    
    return ($schemaObj | ConvertTo-Json -Depth 6)
}

function Escape-HtmlAttribute([string]$val) {
    if (-not $val) { return "" }
    return $val.Replace("&", "&amp;").Replace('"', "&quot;").Replace("<", "&lt;").Replace(">", "&gt;")
}

foreach ($item in $catalog) {
    $filePath = Join-Path $HtmlDir $item.file
    if (-not (Test-Path $filePath)) {
        Write-Warning "File not found: $filePath - skipping."
        $skipCount++
        continue
    }

    try {
        $html = Get-Content $filePath -Raw -Encoding UTF8
        
        $safeTitle = [System.Security.SecurityElement]::Escape($item.title)
        $safeDesc = Escape-HtmlAttribute $item.description
        $safeKeywords = Escape-HtmlAttribute $item.keywords
        $safeCanonical = Escape-HtmlAttribute $item.canonical
        $safeOgTitle = Escape-HtmlAttribute $item.ogTitle
        $safeOgDesc = Escape-HtmlAttribute $item.ogDescription
        $safeOgImage = Escape-HtmlAttribute $item.ogImage
        $safeRobots = Escape-HtmlAttribute $item.robots
        $safeTwCard = if ($item.twitterCard) { $item.twitterCard } else { "summary_large_image" }

        # 1. Update <title>
        if ($html -match '<title>[\s\S]*?<\/title>') {
            $html = [regex]::Replace($html, '<title>[\s\S]*?<\/title>', "<title>$($item.title)</title>")
        }

        # 2. Update/Insert <meta name="description">
        if ($html -match '<meta\s+name=["'']description["''][^>]*>') {
            $html = [regex]::Replace($html, '<meta\s+name=["'']description["''][^>]*>', "<meta name=`"description`" content=`"$safeDesc`">")
        } else {
            $html = [regex]::Replace($html, '(<\/title>)', "`$1`n  <meta name=`"description`" content=`"$safeDesc`">")
        }

        # 3. Update/Insert <meta name="keywords">
        if ($html -match '<meta\s+name=["'']keywords["''][^>]*>') {
            $html = [regex]::Replace($html, '<meta\s+name=["'']keywords["''][^>]*>', "<meta name=`"keywords`" content=`"$safeKeywords`">")
        } else {
            $html = [regex]::Replace($html, '(<meta\s+name=["'']description["''][^>]*>)', "`$1`n  <meta name=`"keywords`" content=`"$safeKeywords`">")
        }

        # 4. Canonical URL
        if ($html -match '<link\s+rel=["'']canonical["''][^>]*>') {
            $html = [regex]::Replace($html, '<link\s+rel=["'']canonical["''][^>]*>', "<link rel=`"canonical`" href=`"$safeCanonical`">")
        } else {
            $html = [regex]::Replace($html, '(<meta\s+name=["'']keywords["''][^>]*>)', "`$1`n  <link rel=`"canonical`" href=`"$safeCanonical`">")
        }

        # 5. Robots Meta
        if ($html -match '<meta\s+name=["'']robots["''][^>]*>') {
            $html = [regex]::Replace($html, '<meta\s+name=["'']robots["''][^>]*>', "<meta name=`"robots`" content=`"$safeRobots`">")
        } else {
            $html = [regex]::Replace($html, '(<link\s+rel=["'']canonical["''][^>]*>)', "`$1`n  <meta name=`"robots`" content=`"$safeRobots`">")
        }

        # 6. Open Graph & Twitter Cards Block
        $ogBlock = @"
  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Divya Drishti">
  <meta property="og:url" content="$safeCanonical">
  <meta property="og:title" content="$safeOgTitle">
  <meta property="og:description" content="$safeOgDesc">
  <meta property="og:image" content="$safeOgImage">

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="$safeTwCard">
  <meta name="twitter:title" content="$safeOgTitle">
  <meta name="twitter:description" content="$safeOgDesc">
  <meta name="twitter:image" content="$safeOgImage">
"@

        # Remove existing Open Graph & Twitter tags to prevent duplicates
        $html = [regex]::Replace($html, '\s*<!--\s*(Open Graph|Twitter)[^>]*-->[\s\S]*?(?=<!--|<\/head>|<link|<script)', '')
        $html = [regex]::Replace($html, '\s*<meta\s+property=["'']og:[^>]*>', '')
        $html = [regex]::Replace($html, '\s*<meta\s+name=["'']twitter:[^>]*>', '')

        # Insert cleanly after robots or canonical
        if ($html -match '(<meta\s+name=["'']robots["''][^>]*>)') {
            $html = [regex]::Replace($html, '(<meta\s+name=["'']robots["''][^>]*>)', "`$1`n`n$ogBlock")
        } elseif ($html -match '(<link\s+rel=["'']canonical["''][^>]*>)') {
            $html = [regex]::Replace($html, '(<link\s+rel=["'']canonical["''][^>]*>)', "`$1`n`n$ogBlock")
        }

        # 7. Schema.org JSON-LD Markup
        $schemaJson = Generate-SchemaJson $item
        $schemaTag = @"

  <!-- JSON-LD Structured Data (Schema.org) -->
  <script type="application/ld+json">
$schemaJson
  </script>
"@

        # Remove old schema tag if present
        $html = [regex]::Replace($html, '\s*<!--\s*JSON-LD Structured Data[\s\S]*?<\/script>', '')
        $html = [regex]::Replace($html, '\s*<script\s+type=["'']application\/ld\+json["'']>[\s\S]*?<\/script>', '')

        # Insert right before </head>
        $html = [regex]::Replace($html, '(\s*<\/head>)', "$schemaTag`$1")

        if (-not $DryRun) {
            [System.IO.File]::WriteAllText($filePath, $html, [System.Text.Encoding]::UTF8)
        }

        Write-Host " [OK] Synced: $($item.file) ($($item.title.Substring(0, [Math]::Min(45, $item.title.Length)))...)" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host " [ERROR] Failed syncing $($item.file): $_" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "`n================================================================================" -ForegroundColor Cyan
Write-Host "SYNC COMPLETE: $successCount Success, $skipCount Skipped, $errorCount Failed." -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Cyan
