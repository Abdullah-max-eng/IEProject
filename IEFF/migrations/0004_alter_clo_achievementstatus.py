# Generated by Django 4.1.5 on 2023-05-09 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('IEFF', '0003_alter_clo_achievementstatus'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clo',
            name='achievementStatus',
            field=models.CharField(max_length=10),
        ),
    ]
