from playwright.sync_api import sync_playwright
import pathlib

url = pathlib.Path(r'd:\project\agents\data-bank-promo\mobile.html').resolve().as_uri()
out = r'd:\project\agents\data-bank-promo\mobile-long.png'
edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=edge, headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2)
    page.goto(url, wait_until='load', timeout=40000)
    page.wait_for_timeout(3000)
    page.evaluate("() => { document.querySelectorAll('.reveal').forEach(el => { el.classList.add('in'); el.style.transition = 'none'; }); }")
    page.wait_for_timeout(800)
    page.screenshot(path=out, full_page=True)
    browser.close()

print('SAVED', out)