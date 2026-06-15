#!/usr/bin/env python3

import json
from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    json_path = root / "site-config.json"
    js_path = root / "site-config.js"

    data = json.loads(json_path.read_text(encoding="utf-8"))
    serialized = json.dumps(data, ensure_ascii=False, indent=2)
    content = f"window.__SITE_CONFIG__ = {serialized};\n"
    js_path.write_text(content, encoding="utf-8")


if __name__ == "__main__":
    main()
