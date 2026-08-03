from pathlib import Path
from shutil import copyfile

from PIL import Image


PROJECT = Path(__file__).resolve().parents[1]
WORKSPACE = PROJECT.parent
APPROVED_BANNER = PROJECT / "public" / "campaign-banner-approved.png"

PUBLIC_OUTPUT = PROJECT / "public" / "campaign-banner-300.png"
PAGES_OUTPUT = PROJECT / "docs" / "assets" / "campaign-banner-300.png"
SUBMISSION_OUTPUT = (
    WORKSPACE
    / "outputs"
    / "생명존중_제출물"
    / "사람사이의링크_배너300_최종.png"
)

def build_banner() -> Image.Image:
    # The supplied 300×250px artwork is the approved submission banner.
    # Keep it as a tracked source so future exports reproduce the exact design.
    return Image.open(APPROVED_BANNER).convert("RGB")


def main() -> None:
    banner = build_banner()
    for output in (PUBLIC_OUTPUT, PAGES_OUTPUT, SUBMISSION_OUTPUT):
        output.parent.mkdir(parents=True, exist_ok=True)
        copyfile(APPROVED_BANNER, output)
        print(output)


if __name__ == "__main__":
    main()
