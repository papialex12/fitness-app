# Changelog

## [Unreleased]

### Fixed
- **Prisma Configuration**: Resolved `PrismaClientConstructorValidationError` by migrating datasource URLs to `prisma.config.ts` and removing them from `schema.prisma`. Updated `PrismaClient` usage to match new configuration.
- **UI Translation**: Translated the entire Diagnosis Module to Spanish, including:
    - `DiagnosisPage` title and layout.
    - `AssessmentForm` inputs, labels, and success/error alerts.
    - `BioProfileChart` (Spider Chart) axis and labels.
    - `DiagnosisResultView` profile types, mechanics predictions, and injury badges.
    - `DiagnosisEngine` output strings for Squat Profile analysis.

### Changed
- **Dependencies**: Updated `prisma.config.ts` to use `DATABASE_POOL_URL` for main connection and `DATABASE_URL` for direct connection.
- **Components**: Can now render Diagnosis results entirely in Spanish for a localized user experience.

### Added
- **Type Definitions**: Added `label` field to `SquatProfile` interface in `DiagnosisEngine` to support UI display needs.
