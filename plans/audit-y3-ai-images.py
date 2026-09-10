import hashlib
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

root = Path(__file__).resolve().parent.parent
output = root / '.cache-loader' / 'y3-ai-docs'
output.mkdir(parents=True, exist_ok=True)
image_root = root / 'docs' / 'Y3AI开发教程' / 'Y3_AI_images'
manifest = json.loads((root / 'plans' / 'y3-ai-image-sources.json').read_text(encoding='utf-8'))
source_urls = {item['file']: item['url'] for item in manifest}
files = sorted(image_root.rglob('*.png'))
sheet = Image.new('RGB', (1200, ((len(files) + 2) // 3) * 220), 'white')
draw = ImageDraw.Draw(sheet)
records = []
for index, file in enumerate(files):
    name = file.relative_to(root).as_posix()
    data = file.read_bytes()
    with Image.open(file) as source:
        image = source.convert('RGB')
    if not any(high > low for low, high in image.getextrema()):
        raise ValueError(f'Blank image: {name}')
    record = {'file': name, 'size': image.size, 'sha256': hashlib.sha256(data).hexdigest()}
    if name in source_urls:
        record['source'] = source_urls[name]
    else:
        original = subprocess.check_output(['git', 'show', 'HEAD:' + name], cwd=root)
        if data != original:
            raise ValueError(f'Unexpected change to original image: {name}')
        record['original_unchanged'] = True
    records.append(record)
    x, y = index % 3 * 400, index // 3 * 220
    draw.text((x + 5, y + 5), file.name, fill='black')
    sheet.paste(ImageOps.contain(image, (390, 190)), (x + 5, y + 25))
sheet.save(output / 'local-images.jpg')
(output / 'images.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'verified_local_images': len(records), 'imported_images': len(source_urls), 'unchanged_originals': sum(item.get('original_unchanged', False) for item in records)}, ensure_ascii=False))
