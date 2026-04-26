"""src/pipeline.py

Name: David Kusi 10022200154
Index Number: 10022200154

Pipeline-level LLM wiring.
"""

from __future__ import annotations

from .config import PROJECT_ID
from .generator import LLMGenerator


class PipelineLLM:
    """Thin pipeline wrapper for LLM generation."""

    def __init__(self) -> None:
        self.generator = LLMGenerator(project_id=PROJECT_ID)

    def generate(self, prompt: str) -> str:
        return self.generator.generate(prompt=prompt)
