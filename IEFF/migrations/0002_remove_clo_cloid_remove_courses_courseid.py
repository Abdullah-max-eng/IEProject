# Generated by Django 4.1.5 on 2023-05-09 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('IEFF', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clo',
            name='cloId',
        ),
        migrations.RemoveField(
            model_name='courses',
            name='courseId',
        ),
    ]