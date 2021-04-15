library mCODECancerDiseaseStatusTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test CancerDiseaseStatus":
      First (mCODE."Cancer Disease Statuses")
        
define "Test Condition":
     singleton from ( [Condition] C 
        where C.id = 'f3be0f34-992b-48fb-ac47-f29b7f1365ef' )

define "Test Cancer Disease Status Data Value":
    mCODE."Cancer Disease Status Data Value" ("Test CancerDiseaseStatus")

define "Test Latest Condition Cancer Disease Status":
    mCODE."Latest Condition Cancer Disease Status"("Test Condition") 

define "Test Condition Cancer Disease Status":
    mCODE."Condition Cancer Disease Statuses"("Test Condition") 

