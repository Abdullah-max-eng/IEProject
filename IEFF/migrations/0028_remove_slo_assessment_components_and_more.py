# Generated by Django 4.1.5 on 2023-07-26 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('IEFF', '0027_remove_assessmentcomponent_slos_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='slo',
            name='assessment_components',
        ),
        migrations.AddField(
            model_name='assessmentcomponent',
            name='slos',
            field=models.ManyToManyField(related_name='assessment_components', to='IEFF.slo'),
        ),
    ]
