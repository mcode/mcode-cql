library mCODECancerGeneticVariantTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

define "Test Cancer Genetic Variant Gene Studied":
    mCODE."Cancer Genetic Variant Gene Studied"(First(mCODE."Cancer Genetic Variants"))

define "Test Genetic Variant Value":
    mCODE."Cancer Genetic Variant Data Value"(First(mCODE."Cancer Genetic Variants"))

define "Test Genetic Variant Method":
    mCODE."Cancer Genetic Variant Method"(First(mCODE."Cancer Genetic Variants"))

 define "Test Filter Cancer Genetic Variants":
    mCODE."Filter Cancer Genetic Variants"([Observation])




    