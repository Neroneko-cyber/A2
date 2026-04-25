-- ============================================================
-- Add Shipping Details to Orders Table
-- ============================================================

IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'Orders' AND COLUMN_NAME = 'CourierCode'
)
BEGIN
    ALTER TABLE Orders ADD CourierCode NVARCHAR(20) NULL;
END

IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'Orders' AND COLUMN_NAME = 'TrackingNumber'
)
BEGIN
    ALTER TABLE Orders ADD TrackingNumber NVARCHAR(50) NULL;
END
