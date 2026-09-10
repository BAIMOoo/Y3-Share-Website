"""Annotate user-supplied CC Switch captures without cropping or resampling."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('C:/Users/WBB556~1.LIX/AppData/Local/Temp')
DEST = ROOT / 'docs/Y3AI开发教程/03-Agent部署教程/img'
FONT = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', 19)

def annotate(source, name, boxes, masks=()):
    image = Image.open(SOURCE / source).convert('RGB')
    draw = ImageDraw.Draw(image)
    for rect in masks:
        draw.rectangle(rect, fill='#475569')
    for index, (left, top, right, bottom) in enumerate(boxes, 1):
        draw.rectangle((left, top, right, bottom), outline='#dc2626', width=3)
        cx, cy = left + 3, top - 3
        draw.ellipse((cx - 13, cy - 13, cx + 13, cy + 13), fill='#dc2626')
        draw.text((cx, cy), str(index), font=FONT, fill='white', anchor='mm')
    image.save(DEST / name, optimize=True)
    print(f'{name}: {image.width} x {image.height}')

annotate('codex-clipboard-48be9479-b81a-4ed7-89c2-618f89251f9d.png',
         'codex-deepseek-entry.png', [(433,40,479,80),(839,40,879,81)],
         [(110,225,395,281),(110,324,395,377)])
annotate('codex-clipboard-9b47d2d8-23c8-4e13-bdcd-681ed837d130.png',
         'codex-deepseek-preset.png', [(23,104,447,141),(530,675,687,713)])
annotate('codex-clipboard-b467590d-1829-4043-9b6a-e180bae38031.png',
         'codex-deepseek-fields.png', [(45,435,850,475),(45,559,850,598),(45,695,770,733)])
annotate('codex-clipboard-46af463e-ac72-4ca2-b0b4-1199cf181583.png',
         'codex-deepseek-advanced.png', [(62,166,833,204),(62,383,789,422),(780,822,877,862)])

annotate('codex-clipboard-33903559-30a7-410a-ae27-cd58b84fdffd.png',
         'claude-deepseek-entry.png', [(336,39,385,80),(838,39,879,81)],
         [(110,222,394,278),(110,420,394,474),(110,518,394,572)])
annotate('codex-clipboard-a7b78614-1ef3-4a72-afa4-e497760f2b2c.png',
         'claude-deepseek-preset.png', [(23,104,448,142),(369,718,527,758)])
annotate('codex-clipboard-6f8781ef-12a3-4c43-9180-3d20f9f8eb66.png',
         'claude-deepseek-fields.png', [(44,378,848,418),(44,502,848,540),(60,697,832,736)])
annotate('codex-clipboard-751b2385-daf6-4008-b2f7-6bce581e1d7a.png',
         'claude-deepseek-models.png', [(457,118,720,348),(62,407,720,447),(779,919,874,959)])
