#!/usr/bin/env python3
"""Extracts the text of the BMG ebooks/guides (PDF assets) into
public/mcp/guides.json, the archive the MCP server reads so ChatGPT/Claude can
answer from the manuals as well as from the published analyses.

Run manually after adding or replacing a PDF asset:
    pip install pypdf && python3 scripts/extract-guides.py
"""
import json
import os
import re
import urllib.request

SITE = "https://businessmatching.global"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# asset file (in src/assets) -> guide metadata
GUIDES = [
    {
        "asset": "ebook-exporting-to-brazil.pdf.asset.json",
        "slug": "guide-exporting-to-brazil",
        "lang": "en",
        "title": "Exporting to Brazil — A Practical Manual for EU Businesses",
        "date": "2026-07-17",
        "url": f"{SITE}/news",
    },
    {
        "asset": "brazil-health-market.pdf.asset.json",
        "slug": "guide-brazil-health-market",
        "lang": "en",
        "title": "Brazil's Health Market — operational guide for pharma, devices and supply chain",
        "date": "2026-07-01",
        "url": f"{SITE}/pharma",
    },
    {
        "asset": "eudr-guia-pequeno-produtor.pdf.asset.json",
        "slug": "guide-eudr",
        "lang": "pt",
        "title": "Desmatamento Zero, Mercado Aberto — guia EUDR para o pequeno produtor",
        "date": "2026-07-01",
        "url": f"{SITE}/eudr",
    },
    {
        "asset": "guida-macchinari-brasile.pdf.asset.json",
        "slug": "guide-macchinari-brasile",
        "lang": "it",
        "title": "Vendere macchinari in Brasile — SACE, SIMEST ed ex-tarifário",
        "date": "2026-07-01",
        "url": f"{SITE}/sace",
    },
    {
        "asset": "dossier.pdf.asset.json",
        "slug": "dossier-ajvar",
        "lang": "en",
        "title": "Ajvar — Commercial & Regulatory Dossier for the Brazilian Market (example of our work)",
        "date": "2026-06-01",
        "url": f"{SITE}/sample-report",
    },
]


def clean(text: str) -> str:
    text = text.replace("\u00a0", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def main() -> None:
    from pypdf import PdfReader
    import io

    docs = []
    for guide in GUIDES:
        meta_path = os.path.join(ROOT, "src/assets", guide["asset"])
        with open(meta_path) as fh:
            asset = json.load(fh)
        raw = urllib.request.urlopen(SITE + asset["url"]).read()
        reader = PdfReader(io.BytesIO(raw))
        text = clean("\n".join((page.extract_text() or "") for page in reader.pages))
        docs.append(
            {
                "kind": "guide",
                "slug": guide["slug"],
                "lang": guide["lang"],
                "title": guide["title"],
                "date": guide["date"],
                "url": guide["url"],
                "source": asset["original_filename"],
                "pages": len(reader.pages),
                "text": text,
            }
        )
        print(f"{guide['slug']}: {len(reader.pages)} pages, {len(text)} chars")

    out_dir = os.path.join(ROOT, "public/mcp")
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "guides.json"), "w") as fh:
        json.dump({"guides": docs}, fh, ensure_ascii=False)


if __name__ == "__main__":
    main()
