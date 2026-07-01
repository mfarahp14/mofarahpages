---
layout: post
title: "Building a Kinematics Library: Making Robot Math Usable"
date: 2026-06-30
excerpt: "Why I started writing my own kinematics library and what I learned trying to make the math feel less painful to work with in code."
---

## Why I started this

Every robotics student hits the same wall. The math isn't the hard part — forward kinematics, rotation matrices, Denavit-Hartenberg parameters — once you work through it on paper, it clicks. The hard part is getting from that understanding to code that actually works.

I kept running into libraries that were either too tied to a specific robot stack, underdocumented, or structured in ways that made it hard to understand what was happening at each step. I wanted something I could trust, explain, and build on.

So I started writing my own.

## How I built it

The library is organized around the core building blocks of robot kinematics: homogeneous transforms, rotation representations (rotation matrices, Euler angles, quaternions), and forward kinematics chains using DH parameters.

The main design goal was clarity over cleverness. Each function does one thing, has an obvious name, and accepts and returns the types you'd expect from the math on paper. I test each piece against hand-computed examples before moving on.

The forward kinematics implementation takes a list of DH parameters and joint angles and returns the end-effector transform. Nothing hidden, nothing implicit.

## Clone and run it

```bash
git clone https://github.com/mfarahp14/kinematics-library
cd kinematics-library
pip install -r requirements.txt
python examples/forward_kinematics.py
```

The `examples/` folder has annotated scripts that walk through each concept. Start there rather than in the source — the examples show the intended API and expected outputs side by side.

## What I read

- **[Modern Robotics — Lynch & Park](https://modernrobotics.northwestern.edu/)** — The clearest treatment of screw theory and product-of-exponentials I've found. My implementations follow the notation from this book closely. Work the exercises; the solutions are available and they're worth doing.

- **[A Mathematical Introduction to Robotic Manipulation — Murray, Li & Sastry](https://www.cds.caltech.edu/~murray/mlswiki/)** — Free and rigorous. Useful when Lynch & Park moves too fast on the Lie group foundations. Goes deeper into the geometry than most robotics courses bother with.

- **[Robotics, Vision and Control — Corke](https://petercorke.com/RVC/)** — More code-focused than the others. I used this mainly for cross-checking: if my implementation gives a different answer than Corke's toolbox, one of us is wrong and figuring out which one is actually a useful exercise.
