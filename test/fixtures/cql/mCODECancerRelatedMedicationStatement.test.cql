library mCODECancerRelatedMedicationStatementTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test CancerRelatedMedicationStatement":
      singleton from ([MedicationStatement] m
        where m.id = 'd6d5e888-fe94-457f-9564-d151695c1b36')


define "Test CancerRelatedMedicationStatement Medication":
    mCODE."Cancer Related Medication Statement Medication" ("Test CancerRelatedMedicationStatement")

define "Test CancerRelatedMedicationStatement Termination Reason":
    mCODE."Cancer Related Medication Statement Termination Reason"("Test CancerRelatedMedicationStatement") 

define "Test CancerRelatedMedicationStatement Treatment Intent":
    mCODE."Cancer Related Medication Statement Treatment Intent"("Test CancerRelatedMedicationStatement") 