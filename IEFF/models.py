from django.db import models
from django.contrib.auth.models import User
import pandas as pd
from django.conf import settings
import os
from django.conf import settings
# Create your models here.


# Specify the path to your Excel file
excel_file_path = 'CodesAndTitles.xlsx'


def get_course_data_from_excel(file_path):
    df = pd.read_excel(file_path)  # Read the Excel file
    # Remove duplicates based on code and title
    df.drop_duplicates(subset=['Code', 'Title'], inplace=True)
    # Remove duplicates based on title only
    df.drop_duplicates(subset=['Title'], inplace=True)
    course_code_list = df['Code'].tolist()  # Extract course code column
    course_title_list = df['Title'].tolist()  # Extract course title column
    return course_code_list, course_title_list


course_codes, course_titles = get_course_data_from_excel(excel_file_path)


class SystemUsers(models.Model):
    ROLE_CHOICES = (
        ('professor', 'Professor'),
        ('reviewer', 'Reviewer'),
        ('both', 'Both')
    )
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='SystemUser')
    role = models.CharField(max_length=100, choices=ROLE_CHOICES, default=None)
    drive_link = models.URLField(blank=True)

    def __str__(self):
        return self.user.username


class Courses(models.Model):

    TERM_CHOICES = (
        ('Spring', 'Spring'),
        ('Fall', 'Fall'),
    )

    ACADEMIC_YEAR_CHOICES = (
        ('2021-2022', '2021-2022'),
        ('2022-2023', '2022-2023'),
        ('2023-2024', '2023-2024'),
        ('2024-2025', '2024-2025'),
        ('2025-2026', '2025-2026'),
        ('2026-2027', '2026-2027'),
        ('2027-2028', '2027-2028'),
        ('2028-2029', '2028-2029'),
        ('2029-2030', '2029-2030')
    )
    courseCode = models.CharField(max_length=10, choices=[
                                  (code, code) for code in course_codes])
    term = models.CharField(max_length=10, choices=TERM_CHOICES)
    academicYear = models.CharField(
        max_length=10, choices=ACADEMIC_YEAR_CHOICES)
    courseTitle = models.CharField(max_length=100, choices=[
                                   (title, title) for title in course_titles])
    numberOfStudent = models.PositiveIntegerField(default=0)
    dropOrWithdraw = models.PositiveIntegerField(default=0)
    failRate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    teachingQualityScore = models.DecimalField(
        max_digits=5, decimal_places=2, default=0)
    studentSatisfactionScore = models.DecimalField(
        max_digits=5, decimal_places=2, default=0)
    teacher = models.ForeignKey(
        SystemUsers, on_delete=models.CASCADE, related_name='courses_taught')

    def __str__(self):
        return f" ID:{self.id} --- code:{self.courseCode} --- Title:{self.courseTitle} --- Year: {self.academicYear} --- Term: {self.term}"


class CLO(models.Model):
    index = models.PositiveIntegerField(null=True, blank=True)
    cloMarks = models.PositiveIntegerField(null=True, blank=True)
    cloWeight = models.PositiveIntegerField(null=True, blank=True)
    achievementStatus = models.CharField(max_length=10, null=True, blank=True)
    assessment = models.TextField(null=True, blank=True)
    facultyComment = models.TextField(null=True, blank=True)
    reviewerComment = models.TextField(null=True, blank=True)
    course = models.ForeignKey(
        Courses, on_delete=models.CASCADE, related_name='clos')

    def __str__(self):
        return f"CLO ID: {self.id}------CLO Index: {self.index} ------- {self.course.courseTitle} ---------- ({self.course.term} {self.course.academicYear})"


class AssessmentComponent(models.Model):
    ASSESSMENT_CHOICES = (
        ('Assignment', 'Assignment'),
        ('Quiz', 'Quiz'),
        ('Presentation', 'Presentation'),
        ('Midterm Exam', 'Midterm Exam'),
        ('Final Exam', 'Final Exam'),
        ('Project', 'Project'),
        ('Lab Report', 'Lab Report'),
        ('Essay', 'Essay'),
        ('Group Work', 'Group Work'),
        ('Research Paper', 'Research Paper'),
        ('Online Discussion', 'Online Discussion'),
        ('Peer Review', 'Peer Review'),
        ('Portfolio', 'Portfolio'),
        ('Case Study', 'Case Study'),
        ('Oral Examination', 'Oral Examination'),
        ('Practical Exam', 'Practical Exam'),
        ('Simulation', 'Simulation'),
        ('Field Work', 'Field Work'),
        ('Attendance', 'Attendance'),
        ('Participation', 'Participation'),
        # Add other possible assessment components here
    )
    assessmentType = models.CharField(
        max_length=20, choices=ASSESSMENT_CHOICES, null=True, blank=True)
    clos = models.ManyToManyField(CLO, related_name='assessment_components')

    def __str__(self):
        return self.assessmentType


class Challenges(models.Model):
    index = models.PositiveIntegerField(null=True, blank=True)
    challengeDescription = models.CharField(max_length=100)
    course = models.ForeignKey(
        Courses, on_delete=models.CASCADE, related_name='challenges', null=True)

    def __str__(self):

        return f"ID: {self.id} -------- Index: {self.index} -------({self.course.courseTitle}) ----- ({self.course.term})"


class Issues(models.Model):
    IssueIndex = models.PositiveIntegerField(null=True, blank=True)
    IssueDescription = models.CharField(max_length=300)
    improvementPlan = models.TextField(blank=True, null=True)
    successIndicator = models.TextField(blank=True, null=True)
    actualOutcome = models.TextField(blank=True, null=True)
    endOfSemesterOutcome = models.TextField(blank=True, null=True)
    actionsNeeded = models.TextField(blank=True, null=True)
    reviewersFeedback = models.TextField(blank=True, null=True)
    course = models.ForeignKey(
        Courses, on_delete=models.CASCADE, related_name='issues')

    def __str__(self):
        return f"ID: {self.id} -----  Index {self.IssueIndex} Course {self.course}"


class Week(models.Model):
    weekIndex = models.PositiveIntegerField(null=True, blank=True)
    WeekFeedback = models.TextField(blank=True, null=True)
    course = models.ForeignKey(
        Courses, on_delete=models.CASCADE, related_name='weeks')

    def __str__(self):
        return f"{self.weekIndex} -------({self.course.courseTitle}) ----- ({self.course.term})"

    class Meta:
        ordering = ['pk']


class ReviewersFeedback(models.Model):
    cirteriaStatus = models.TextField(blank=True, null=True)
    Rationale = models.TextField(blank=True, null=True)
    otherComments = models.TextField(blank=True, null=True)
    course = models.OneToOneField(
        Courses, on_delete=models.CASCADE, related_name='reviewers_feedback')

    def __str__(self):
        return f"{self.course.courseCode} Reviewers Feedback"


class SLO(models.Model):
    achievementStatus = models.CharField(max_length=10)
    assessment = models.TextField()
    facultyComment = models.TextField()
    reviewerComment = models.TextField()
    course = models.ForeignKey(
        Courses, on_delete=models.CASCADE, related_name='slos')

    def __str__(self):
        return self.sloId


class GradesCard(models.Model):
    Numberof_A = models.PositiveIntegerField(null=True, blank=True)
    Numberof_B = models.PositiveIntegerField(null=True, blank=True)
    Numberof_C = models.PositiveIntegerField(null=True, blank=True)
    Numberof_D = models.PositiveIntegerField(null=True, blank=True)
    Numberof_F = models.PositiveIntegerField(null=True, blank=True)
    Numberof_W = models.PositiveIntegerField(null=True, blank=True)
    course = models.OneToOneField(
        Courses, on_delete=models.CASCADE, related_name='GradesCard')

    def __str__(self):
        return f"Grades Distro ID: {self.id} for course: {self.course}"

    def get_grade_rate(self, grade):
        total_grades = self.get_total_grades()
        if total_grades > 0:
            if grade == 'A':
                return int((self.Numberof_A / total_grades) * 100)
            elif grade == 'B':
                return int((self.Numberof_B / total_grades) * 100)
            elif grade == 'C':
                return int((self.Numberof_C / total_grades) * 100)
            elif grade == 'D':
                return int((self.Numberof_D / total_grades) * 100)
            elif grade == 'F':
                return int((self.Numberof_F / total_grades) * 100)
            elif grade == 'W':
                return int((self.Numberof_W / total_grades) * 100)
        return 0

    def get_total_grades(self):
        return sum([self.Numberof_A, self.Numberof_B, self.Numberof_C, self.Numberof_D, self.Numberof_F, self.Numberof_W])
