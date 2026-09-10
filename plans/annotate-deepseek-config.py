"""Annotate existing official CC Switch screenshots; never simulate a live session."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'docs/Y3AI开发教程/Y3_AI_images/cc-switch'
DEST = ROOT / 'docs/Y3AI开发教程/03-Agent部署教程/img'
FONT = 'C:/Windows/Fonts/msyh.ttc'

def annotate(source, output, boxes):
    canvas = Image.open(SOURCE / source).convert('RGB')
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.truetype(FONT, 24)
    for index, (x, y, w, h) in enumerate(boxes, 1):
        draw.rectangle((x, y, x + w, y + h), outline='#dc2626', width=4)
        draw.ellipse((x - 14, y - 14, x + 22, y + 22), fill='#dc2626')
        draw.text((x - 3, y - 14), str(index), font=font, fill='white')
    canvas.save(DEST / output)

annotate('main-zh.png', 'deepseek-add-entry.png',
         [(799, 51, 204, 85), (1010, 51, 204, 85), (1702, 54, 90, 80)])
annotate('add-zh.png', 'deepseek-preset-entry.png', [(718, 260, 200, 75)])

canvas = Image.new('RGB', (1200, 710), '#f1f5f9')
draw = ImageDraw.Draw(canvas)
title = ImageFont.truetype(FONT, 34)
font = ImageFont.truetype(FONT, 24)
mono = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 25)
draw.text((36, 28), 'DeepSeek V4 Flash · 参数填写对照', font=title, fill='#0f172a')
draw.text((36, 82), '参数示意图（不是软件截图）· 两种客户端分别添加供应商', font=font, fill='#475569')
for top, heading, rows in [
    (140, 'Claude Code', [('请求地址', 'https://api.deepseek.com/anthropic'),
                            ('主模型 / 各模型映射', 'deepseek-v4-flash'),
                            ('API Key', '填写自己创建的 DeepSeek API Key')]),
    (427, 'Codex', [('请求地址', 'https://api.deepseek.com'),
                       ('模型 ID', 'deepseek-v4-flash'),
                       ('上游格式', 'Responses（原生）')])]:
    draw.rounded_rectangle((28, top, 1172, top + 257), 16, fill='white', outline='#cbd5e1', width=2)
    draw.text((52, top + 18), heading, font=title, fill='#1d4ed8')
    for i, (label, value) in enumerate(rows):
        y = top + 84 + i * 53
        draw.text((52, y), label, font=font, fill='#475569')
        draw.text((380, y), value, font=mono if value.isascii() else font, fill='#0f172a')
canvas.save(DEST / 'deepseek-flash-values.png')
