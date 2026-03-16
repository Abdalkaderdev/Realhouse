#!/usr/bin/env python3
"""
PDF Image Extractor for Real House Projects
Extracts all images from PDF catalogs into project folders
"""

import fitz  # PyMuPDF
import os
import sys
from pathlib import Path

def extract_images(pdf_path: str, output_dir: str, min_size: int = 10000):
    """
    Extract images from PDF to output directory.

    Args:
        pdf_path: Path to PDF file
        output_dir: Directory to save images
        min_size: Minimum image size in bytes (filters out tiny icons)
    """
    # Create output directory
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # Open PDF
    doc = fitz.open(pdf_path)
    image_count = 0

    print(f"Processing: {os.path.basename(pdf_path)}")
    print(f"Pages: {len(doc)}")
    print(f"Output: {output_dir}")
    print("-" * 50)

    for page_num in range(len(doc)):
        page = doc[page_num]
        image_list = page.get_images()

        for img_index, img in enumerate(image_list):
            xref = img[0]

            try:
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]

                # Skip small images (icons, bullets, etc.)
                if len(image_bytes) < min_size:
                    continue

                # Generate filename
                image_count += 1
                filename = f"page{page_num + 1:02d}_img{img_index + 1:02d}.{image_ext}"
                filepath = os.path.join(output_dir, filename)

                # Save image
                with open(filepath, "wb") as f:
                    f.write(image_bytes)

                # Get image dimensions
                width = base_image.get("width", 0)
                height = base_image.get("height", 0)
                size_kb = len(image_bytes) / 1024

                print(f"  Page {page_num + 1}: {filename} ({width}x{height}, {size_kb:.1f}KB)")

            except Exception as e:
                print(f"  Page {page_num + 1}: Error extracting image {img_index + 1}: {e}")

    doc.close()

    print("-" * 50)
    print(f"Total images extracted: {image_count}")
    return image_count


def main():
    if len(sys.argv) < 3:
        print("Usage: python extract-pdf-images.py <pdf_path> <output_dir> [min_size_bytes]")
        sys.exit(1)

    pdf_path = sys.argv[1]
    output_dir = sys.argv[2]
    min_size = int(sys.argv[3]) if len(sys.argv) > 3 else 10000

    if not os.path.exists(pdf_path):
        print(f"Error: PDF not found: {pdf_path}")
        sys.exit(1)

    extract_images(pdf_path, output_dir, min_size)


if __name__ == "__main__":
    main()
