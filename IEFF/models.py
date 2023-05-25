from django.db import models
from django.contrib.auth.models import User
# Create your models here.


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
    courseCode = models.CharField(max_length=10)
    term = models.CharField(max_length=10)
    academicYear = models.CharField(max_length=10)
    courseTitle = models.CharField(max_length=100)
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
        return self.courseTitle


class SLO(models.Model):
    achievementStatus = models.CharField(max_length=10)
    assessment = models.TextField()
    facultyComment = models.TextField()
    reviewerComment = models.TextField()
    course = models.ForeignKey(
        Courses, on_delete=models.CASCADE, related_name='slos')

    def __str__(self):
        return self.sloId


class CLO(models.Model):
    cloMarks = models.PositiveIntegerField(max_length=100)
    cloWeight = models.PositiveIntegerField(max_length=100)
    achievementStatus = models.CharField(max_length=10)
    assessment = models.TextField()
    facultyComment = models.TextField()
    reviewerComment = models.TextField()
    course = models.ForeignKey(
        Courses, on_delete=models.CASCADE, related_name='clos')

    def __str__(self):
        return self.cloId


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
        return self.assessmentDescription


class Challenges(models.Model):
    challengeDescription = models.CharField(max_length=100)
    courses = models.ManyToManyField(Courses, related_name='challenges')

    def __str__(self):
        return self.challengeDescription


class Issues(models.Model):
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
        return self.IssueDescription


class Week(models.Model):
    WeekFeedback = models.TextField(blank=True, null=True)
    course = models.ForeignKey(
        Courses, on_delete=models.CASCADE, related_name='weeks')

    def __str__(self):
        return f"Week {self.pk} ({self.course.courseCode})"

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
