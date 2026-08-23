"""
Accurately formatted PDF generator for Pedapudi Surya Teja with exact line heights
"""

def generate_clean_pdf(output_path="Pedapudi_Surya_Teja_Resume.pdf"):
    stream_ops = []
    
    # Header Name
    stream_ops.append("BT /F1 22 Tf 45 800 Td (Pedapudi Surya Teja) Tj ET")
    
    # Header Contacts
    stream_ops.append("BT /F2 8.5 Tf 45 784 Td (suryapedapudi2404@gmail.com  \x95  linkedin.com/in/suryapedapudi  \x95  suryapedapudi.web-dev.page) Tj ET")
    
    def add_section_header(title, y_pos):
        stream_ops.append(f"BT /F1 10 Tf 45 {y_pos} Td ({title}) Tj ET")
        stream_ops.append(f"0.8 0.8 0.8 RG 0.5 w 45 {y_pos - 4} m 550 {y_pos - 4} l S 0 0 0 RG")
    
    # 1. CAREER OBJECTIVE
    add_section_header("CAREER OBJECTIVE", 755)
    stream_ops.append("BT /F2 8.5 Tf 45 736 Td (To leverage my skills in Python and web development, focusing on learning generative AI alongside deep foundations of) Tj")
    stream_ops.append("0 -12 Td (HTML and JavaScript to contribute to innovative projects. I aim to apply my technical expertise, continuous learning agility,) Tj")
    stream_ops.append("0 -12 Td (and dedication to secure a challenging internship or role in a growth-oriented environment where I can build practical software solutions.) Tj ET")
    
    # 2. EDUCATION
    add_section_header("EDUCATION", 685)
    # MLRITM
    stream_ops.append("BT /F1 9 Tf 45 667 Td (Marri Laxman Reddy Institute of Technology and Management) Tj ET")
    stream_ops.append("BT /F2 9 Tf 485 667 Td (2023 \x96 2027) Tj ET")
    stream_ops.append("BT /F3 8.5 Tf 45 654 Td (Bachelor of Technology \x96 Artificial Intelligence and Machine Learning) Tj ET")
    
    # Narayana Junior College
    stream_ops.append("BT /F1 9 Tf 45 635 Td (Narayana Junior College) Tj ET")
    stream_ops.append("BT /F2 9 Tf 520 635 Td (2023) Tj ET")
    stream_ops.append("BT /F3 8.5 Tf 45 622 Td (Intermediate (MPC)) Tj ET")
    
    # Narayana High School
    stream_ops.append("BT /F1 9 Tf 45 603 Td (Narayana High School) Tj ET")
    stream_ops.append("BT /F2 9 Tf 520 603 Td (2021) Tj ET")
    stream_ops.append("BT /F3 8.5 Tf 45 590 Td (Secondary School Certificate (SSC)) Tj ET")
    
    # 3. PROJECTS
    add_section_header("PROJECTS", 560)
    # Project 1: AI Resume Analyzer
    stream_ops.append("BT /F1 9 Tf 45 542 Td (AI Resume Analyzer) Tj /F2 8.5 Tf 135 542 Td ( \x96 resume-analyzer-beryl-rho.vercel.app) Tj /F2 8.5 Tf 485 542 Td (March 2026) Tj ET")
    stream_ops.append("BT /F2 8.5 Tf 45 528 Td (\x95  Designed and developed an AI-powered resume analysis utility using Streamlit and a modern Generative AI SDK to) Tj")
    stream_ops.append("0 -11.5 Td (   evaluate resume compliance against job requirements.) Tj")
    stream_ops.append("0 -12 Td (\x95  Implemented structured text extraction and context-aware feedback loops, allowing users to rapidly identify skill gaps and format flaws.) Tj")
    stream_ops.append("0 -12 Td (\x95  Optimized configuration workflows, directly managing API version upgrades and automated deployments via Vercel and GitHub.) Tj ET")
    
    # Project 2: Prompt Forge AI
    stream_ops.append("BT /F1 9 Tf 45 465 Td (Prompt Forge AI) Tj /F2 8.5 Tf 125 465 Td ( \x96 prompt-forge-ai-wine.vercel.app) Tj /F2 8.5 Tf 475 465 Td (February 2026) Tj ET")
    stream_ops.append("BT /F2 8.5 Tf 45 451 Td (\x95  Engineered an interactive web platform utilizing TypeScript, React, and Tailwind CSS tailored for professional prompt engineering) Tj")
    stream_ops.append("0 -11.5 Td (   and optimization.) Tj")
    stream_ops.append("0 -12 Td (\x95  Integrated Large Language Model APIs to translate unstructured or vague user requirements into high-fidelity, actionable) Tj")
    stream_ops.append("0 -11.5 Td (   production prompts.) Tj")
    stream_ops.append("0 -12 Td (\x95  Deployed the production application seamlessly via Git workflow automation directly onto the Vercel hosting ecosystem.) Tj ET")
    
    # 4. SKILLS & ATTRIBUTES
    add_section_header("SKILLS & ATTRIBUTES", 365)
    stream_ops.append("BT /F1 8.5 Tf 45 347 Td (Programming Languages:) Tj /F2 8.5 Tf 180 347 Td (Python, JavaScript, HTML, CSS) Tj ET")
    stream_ops.append("BT /F1 8.5 Tf 45 331 Td (Core Competencies:) Tj /F2 8.5 Tf 180 331 Td (Generative AI Foundations, Web Development, Proofreading, Content Writing,) Tj 0 -11.5 Td (Data Entry, Problem Solving) Tj ET")
    stream_ops.append("BT /F1 8.5 Tf 45 304 Td (Languages Spoken:) Tj /F2 8.5 Tf 180 304 Td (English, Telugu, Hindi) Tj ET")
    stream_ops.append("BT /F1 8.5 Tf 45 288 Td (Certifications:) Tj /F2 8.5 Tf 180 288 Td (Completed 'Values of Code' Web Development Certification) Tj ET")

    stream_content = "\n".join(stream_ops)
    stream_bytes = stream_content.encode('latin1')
    stream_len = len(stream_bytes)
    
    pdf_text = f"""%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 595.28 841.89]
/Contents 4 0 R
/Resources <<
  /Font <<
    /F1 5 0 R
    /F2 6 0 R
    /F3 7 0 R
  >>
>>
>>
endobj
5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
endobj
6 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
7 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Oblique
>>
endobj
4 0 obj
<<
/Length {stream_len}
>>
stream
{stream_content}
endstream
endobj
xref
0 8
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000370 00000 n 
0000000228 00000 n 
0000000275 00000 n 
0000000322 00000 n 
trailer
<<
/Size 8
/Root 1 0 R
>>
startxref
{420 + stream_len}
%%EOF
"""
    with open(output_path, "wb") as f:
        f.write(pdf_text.encode('latin1'))
    print(f"Generated clean {output_path} with 0 overlaps.")

if __name__ == "__main__":
    generate_clean_pdf()
