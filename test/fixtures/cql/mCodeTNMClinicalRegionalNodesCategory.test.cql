library mCodeTNMClinicalRegionalNodesCategoryTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Observation":
    singleton from ([Observation] o
        where o.id = '891fbf6bd0bdf928474c239da9bd6a59f042974b3a801c7d8c1ef483ace93f05')

define "Test Condition":
    singleton from ([Condition] c
        where c.id = 'conditionId-1')                 

define "Test Is TNM Clinical Regional Nodes Category":
    mCODE."Is TNM Clinical Regional Nodes Category"("Test Observation")   

define "Test Current TNM Clinical Regional Nodes Categories":
    mCODE."Current TNM Clinical Regional Nodes Categories"("Test Condition")    

define "Test Latest TNM Clinical Regional Nodes Categories":
    mCODE."Latest TNM Clinical Regional Nodes Categories"("Test Condition")
             