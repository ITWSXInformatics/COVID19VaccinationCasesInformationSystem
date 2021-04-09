# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class State(models.Model):
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
        managed = False
        db_table = 'state'
