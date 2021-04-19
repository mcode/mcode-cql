library mCodeTNMPathologicalStageGroupTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Observation":
    singleton from ([Observation] o
        where o.id = 'mCODETNMPathologicalStageGroupExample01')

define "Test Observation2":
    singleton from ([Observation] o
        where o.id = 'd07680cd7040d712e15f332ffa5d6523843b65dc55ca72b215225252fed7335f')

define "Test Condition":
    singleton from ([Condition] c
        where c.id = 'conditionId-1')        

define "Test Reference id":
    mCODE."Reference id"(("Test Observation" as FHIR.Observation).hasMember[0])           

define "Test Is TNM Pathological Stage Group":
    mCODE."Is TNM Pathological Stage Group"("Test Observation")   

define "Test Is TNM Pathological Stage Group False":
    mCODE."Is TNM Pathological Stage Group"("Test Observation2")       

define "Test Current TNM Pathological Stage Groups":
    mCODE."Current TNM Pathological Stage Groups"("Test Condition")         

define "Test Latest TNM Pathological Stage Group":
    mCODE."Latest TNM Pathological Stage Group"("Test Condition")       

define "Test Earliest TNM Pathological Stage Group":
    mCODE."Earliest TNM Pathological Stage Group"("Test Condition")                 

define "Test TNM Pathological Stage Group Categories":
    mCODE."TNM Pathological Stage Group Categories"("Test Observation")  

define "Test TNM Pathological Stage Group Value":
   mCODE."TNM Pathological Stage Group Value"("Test Observation")  

define "Test TNM Pathological Stage Group Staging System":
   mCODE."TNM Pathological Stage Group Staging System"("Test Observation")  