library mCodeTNMPathologicalRegionalNodesCategoryTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Observation":
    singleton from ([Observation] o
        where o.id = 'mCODETNMPathologicalRegionalNodesCategoryExample01')

define "Test Condition":
    singleton from ([Condition] c
        where c.id = 'conditionId-1')                 

define "Test Is TNM Pathological Regional Nodes Category":
    mCODE."Is TNM Pathological Regional Nodes Category"("Test Observation")   

define "Test Current TNM Pathological Regional Nodes Categories":
    mCODE."Current TNM Pathological Regional Nodes Categories"("Test Condition")    

define "Test Latest TNM Pathological Regional Nodes Categories":
    mCODE."Latest TNM Pathological Regional Nodes Categories"("Test Condition")
             