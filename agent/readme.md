# Agent System

A modular agent system that can perform various tasks including calculations and searches.

## Directory Structure

```
│
├── tools/
│   ├── calculator_tools.py    # Mathematical operation tools
│   └── search_tools.py        # Search operation tools
├── .env                       # Environment variables
├── .gitignore                # Git ignore rules
├── agents.py                 # Agent definitions
├── main.py                   # Main entry point
├── readme.md                 # This file
├── requirements.txt          # Project dependencies
└── tasks.py                 # Task management
```

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` (if provided)
   - Update the values in `.env` with your configuration

## Usage

Run the main script:
```bash
python main.py
```

## Features

- Calculator tools for basic mathematical operations
- Search tools for text and binary search
- Task management system
- Modular agent architecture
- Environment variable configuration

## Development

To add new tools:
1. Create a new file in the `tools/` directory
2. Implement your tool class
3. Update the `Agent` class in `agents.py` to support the new tool
4. Add any new dependencies to `requirements.txt`

## License

MIT License 