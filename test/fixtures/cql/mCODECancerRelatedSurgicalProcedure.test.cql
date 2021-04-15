library mCODECancerRelatedSurgicalProcedureTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test CancerRelatedSurgicalProcedure":
      singleton from ([Procedure] p
        where p.id = 'c622d837-fdee-4897-9d80-da0091d924c1')


define "Test CancerRelatedSurgicalProcedure Code":
    mCODE."Cancer Related Surgical Procedure Code" ("Test CancerRelatedSurgicalProcedure")

define "Test CancerRelatedSurgicalProcedure Treatment Intent":
    mCODE."Cancer Related Surgical Procedure Treatment Intent"("Test CancerRelatedSurgicalProcedure") 