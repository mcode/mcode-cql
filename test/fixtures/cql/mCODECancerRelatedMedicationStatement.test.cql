library mCODETumorMarkerTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Tumor Marker":
      singleton from ([Observation] o
        where o.id = '53a6e3e8-fbcd-4cdf-8e8f-28de9ec5d234')

define "Test Tumor Markers By Value Set":
    mCODE."Tumor Markers By Value Set"(mCODE."Tumor Marker Tests")

define "Test Tumor Marker Code":
    First ("Test Tumor Marker").code 

define "Test Tumor Marker Data Value":
    First ("Test Tumor Marker").value  

define "Test Value Set":
    mCODE."Return Value Set"(mCODE."Tumor Marker Tests")