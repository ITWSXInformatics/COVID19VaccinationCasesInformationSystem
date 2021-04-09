# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

# class state_Info(models.Model):
#     state = models.CharField(max_length = 32)
#     cases = models.IntegerField()
#     cases_day = models.IntegerField()
#     cases_week = models.IntegerField()
#     deaths = models.IntegerField()
#     deaths_day = models.IntegerField()
#     deaths_week = models.IntegerField()
#     vac_adm = models.IntegerField()
#     vac_first = models.IntegerField()
#     vac_second = models.IntegerField()


class State(models.Model):
    id = models.AutoField(primary_key=True)
    state = models.TextField(blank=True, null=True)
    cases = models.BigIntegerField(blank=True, null=True)
    cases_day = models.BigIntegerField(blank=True, null=True)
    cases_week = models.BigIntegerField(blank=True, null=True)
    deaths = models.BigIntegerField(blank=True, null=True)
    deaths_day = models.BigIntegerField(blank=True, null=True)
    deaths_week = models.BigIntegerField(blank=True, null=True)
    vac_adm = models.TextField(blank=True, null=True)  # This field type is a guess.
    vac_first = models.TextField(blank=True, null=True)  # This field type is a guess.
    vac_second = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = True
        db_table = 'State'


class Covid(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField(blank=True, null=True)
    state = models.CharField(blank=True, null=True,max_length=32,default='')
    Cases = models.FloatField(blank=True, null=True,default=0)
    Deaths = models.FloatField(blank=True, null=True,default=0)

    class Meta:
        managed = True
        db_table = 'Covid'



