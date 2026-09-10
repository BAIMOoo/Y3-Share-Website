"""Keep native PNG viewport pixels; add only redaction and numbered highlights."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('C:/Users/wb.lixinyan03/.codex/tmp/deepseek-doc-shots')
DEST = ROOT / 'docs/Y3AI开发教程/03-Agent部署教程/img'
FONT = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', 22)

def export(name, boxes, masks=(), dialog=None):
    im = Image.open(SOURCE / f'{name}.png').convert('RGB')
    original = im.copy()
    draw = ImageDraw.Draw(im)
    for rect in masks:
        draw.rectangle(rect, fill='#475569')
    if name != 'landing':
        draw.rectangle((20, im.height-55, 180, im.height-10), fill='#475569')
    if dialog:
        mask = Image.new('L', im.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle(dialog, radius=24, fill=255)
        im.paste(original, (0, 0), mask)
    draw = ImageDraw.Draw(im)
    for i, (x1, y1, x2, y2) in enumerate(boxes, 1):
        draw.rectangle((x1,y1,x2,y2), outline='#dc2626', width=3)
        draw.ellipse((x1-11,y1-11,x1+21,y1+21), fill='#dc2626')
        draw.text((x1-2,y1-12),str(i),font=FONT,fill='white')
    im.save(DEST / f'deepseek-platform-{name}.png', optimize=True)

export('landing', [(655,496,988,634)])
export('usage', [(16,81,247,123),(618,359,972,450),(981,405,1059,444)],
       [(629,403,786,440),(1104,403,1284,440),(629,648,801,685),
        (947,648,1065,685),(1260,648,1462,685),(625,748,1540,863)])
export('keys', [(16,125,245,164),(1386,185,1557,234)], [(620,298,1438,696)])
export('create', [(790,413,1130,459),(997,473,1129,515)],
       [(617,298,1440,699)], dialog=(770,330,1150,534))
