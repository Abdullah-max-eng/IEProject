# Generated by Django 4.1.5 on 2023-06-21 12:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('IEFF', '0019_remove_challenges_courses_challenges_course'),
    ]

    operations = [
        migrations.CreateModel(
            name='GradesCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Numberof_A', models.PositiveIntegerField(blank=True, null=True)),
                ('Numberof_B', models.PositiveIntegerField(blank=True, null=True)),
                ('Numberof_C', models.PositiveIntegerField(blank=True, null=True)),
                ('Numberof_D', models.PositiveIntegerField(blank=True, null=True)),
                ('Numberof_F', models.PositiveIntegerField(blank=True, null=True)),
                ('Numberof_W', models.PositiveIntegerField(blank=True, null=True)),
                ('course', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='GradesCard', to='IEFF.courses')),
            ],
        ),
    ]
