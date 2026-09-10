"""Annotate browser-rendered PNG captures; reject JPEG masquerading as PNG."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageStat

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / '.cache-loader/agent-screenshots-lossless'
OUT = ROOT / 'docs/Y3AI开发教程/03-Agent部署教程/img'
OUT.mkdir(exist_ok=True)
RED = '#c62828'


def annotate(name, capture):
    source = Image.open(RAW / f'{name}.png')
    if source.format != 'PNG':
        raise ValueError(f'{name}: expected native PNG, got {source.format}')
    scale = capture['dpr']
    if source.size != (capture['width'] * scale, capture['height'] * scale):
        raise ValueError(f'{name}: capture dimensions do not match browser pixel density')
    picture = source.convert('RGB')
    if sum(ImageStat.Stat(picture).stddev) < 15:
        raise ValueError(f'{name}: blank capture')
    font = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', round(22 * scale))
    draw = ImageDraw.Draw(picture)
    for number, css_box in capture['marks']:
        box = tuple(round(value * scale) for value in css_box)
        draw.rounded_rectangle(box, radius=round(5 * scale), outline=RED, width=round(4 * scale))
        cx, cy = box[0] - 24 * scale, (box[1] + box[3]) // 2
        radius = 17 * scale
        draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=RED)
        draw.text((cx, cy - scale), str(number), font=font, fill='white', anchor='mm')
    picture.save(OUT / f'{name}.png', optimize=True)


if __name__ == '__main__':
    captures = json.loads((ROOT / 'plans/agent-screenshots-capture.json').read_text(encoding='utf-8'))
    for name, capture in captures.items():
        annotate(name, capture)
