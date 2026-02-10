import csv
import random

def generate_nigerian_student_data(num_students=500):
    first_names = [
        "Chinedu", "Adebayo", "Ngozi", "Emeka", "Fatima", "Yusuf", "Chioma", "Kelechi",
        "Tunde", "Zainab", "Olumide", "Ify", "Musa", "Ada", "Funke", "Chika", "Bisi",
        "Sola", "Ibrahim", "Amina", "Uche", "Nneka", "Segun", "Folake", "Kemi", "Bola",
        "Dapo", "Tari", "Efe", "Ogechi", "Amara", "Obinna", "Jide", "Simi", "Femi"
    ]
    last_names = [
        "Okeke", "Adeyemi", "Okonkwo", "Bello", "Abubakar", "Eze", "Okafor", "Williams",
        "Johnson", "Mensah", "Sowore", "Balogun", "Ojo", "Aliyu", "Mustapha", "Nwachukwu",
        "Umar", "Hassan", "Garba", "Danjuma", "Lawal", "Ayinla", "Akinwumi", "Ogundipe",
        "Nwosu", "Oni", "Adeleke", "Bankole", "Fashola", "Tinubu", "Sanusi", "Dangote"
    ]

    data = []
    headers = [
        "student_id", "name", "gpa", "attendance_rate", 
        "assignments_completed", "household_income_bracket", 
        "parent_education_level", "risk_level"
    ]
    data.append(headers)

    for i in range(1, num_students + 1):
        # Generate Student ID
        student_id = f"S{str(i).zfill(3)}"

        # Generate Name
        name = f"{random.choice(first_names)} {random.choice(last_names)}"

        # Generate Features with some correlation
        # Higher attendance/assignments usually correlate with higher GPA
        attendance_rate = round(random.uniform(0.5, 1.0), 2)
        
        base_gpa = 2.0
        if attendance_rate > 0.9: base_gpa += random.uniform(1.0, 2.0)
        elif attendance_rate > 0.7: base_gpa += random.uniform(0.5, 1.5)
        else: base_gpa += random.uniform(0.0, 1.0)
        
        gpa = round(min(base_gpa, 4.0), 2)
        
        assignments_completed = int(attendance_rate * 20) + random.randint(-2, 2)
        assignments_completed = max(0, min(assignments_completed, 20))

        household_income_bracket = random.randint(1, 4) # 1: Low, 4: High
        parent_education_level = random.randint(1, 4)   # 1: High School, 4: PhD

        # Assign Risk Labels based on logic (to make it "ground truth")
        risk_score = 0
        if gpa < 2.0: risk_score += 0.4
        if attendance_rate < 0.75: risk_score += 0.3
        if assignments_completed < 8: risk_score += 0.2

        prob = min(risk_score, 1.0)
        
        if prob > 0.6: risk_level = "High"
        elif prob > 0.3: risk_level = "Medium"
        else: risk_level = "Low"

        data.append([
            student_id, name, gpa, attendance_rate, 
            assignments_completed, household_income_bracket, 
            parent_education_level, risk_level
        ])

    return data

def save_to_csv(data, filename="training_dataset.csv"):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)
    print(f"Successfully generated {len(data)-1} records to {filename}")

if __name__ == "__main__":
    dataset = generate_nigerian_student_data(500)
    save_to_csv(dataset, "/Users/evidence/Projects/EarlyWarn-AI/frontend/public/training_dataset.csv") 
