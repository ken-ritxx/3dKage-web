# Simple HTTP Static Server for Kage Landing Page
param(
  [int]$Port = 4173
)

$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

$listener = [System.Net.HttpListener]::new()
$prefix = "http://127.0.0.1:$Port/"
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
  Write-Host "==========================================================" -ForegroundColor Cyan
  Write-Host " Kage Landing Page Server Running at: $prefix" -ForegroundColor Green
  Write-Host " Root Directory: $root" -ForegroundColor Gray
  Write-Host " Press Ctrl+C in PowerShell to stop the server." -ForegroundColor Yellow
  Write-Host "==========================================================" -ForegroundColor Cyan

  # Auto-open browser
  Start-Process $prefix

  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $rawUrl = $request.RawUrl
    if ($rawUrl.Contains("?")) {
      $rawUrl = $rawUrl.Substring(0, $rawUrl.IndexOf("?"))
    }
    if ($rawUrl -eq "/" -or $rawUrl -eq "") {
      $rawUrl = "/index.html"
    }

    $relativePath = $rawUrl.TrimStart("/").Replace("/", "\")
    $localPath = Join-Path $root $relativePath

    if (Test-Path -Path $localPath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
      $mime = switch ($ext) {
        ".html" { "text/html; charset=utf-8" }
        ".css"  { "text/css; charset=utf-8" }
        ".js"   { "application/javascript; charset=utf-8" }
        ".webp" { "image/webp" }
        ".svg"  { "image/svg+xml" }
        ".woff2"{ "font/woff2" }
        ".woff" { "font/woff" }
        ".png"  { "image/png" }
        ".jpg"  { "image/jpeg" }
        ".json" { "application/json" }
        default { "application/octet-stream" }
      }

      $response.ContentType = $mime
      $response.Headers.Add("Access-Control-Allow-Origin", "*")
      
      $bytes = [System.IO.File]::ReadAllBytes($localPath)
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rawUrl")
      $response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $response.OutputStream.Close()
  }
} catch {
  Write-Host "Server error or stopped: $_" -ForegroundColor Red
} finally {
  $listener.Stop()
}
