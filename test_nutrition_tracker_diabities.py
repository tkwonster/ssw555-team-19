import unittest
from nutrition_tracker_diabities import NutritionTracker

class NutritionTrackerTest(unittest.TestCase):
    def setUp(self):
        self.nutrition_tracker = NutritionTracker()

    def test_take_picture(self):
        pictureTaken = self.nutrition_tracker.take_picture()
        self.assertEqual(pictureTaken, "Picture taken successfully.")
        self.assertTrue(self.nutrition_tracker.picture_taken)

    def test_upload_without_picture(self):
        uploaded_without_picture = self.nutrition_tracker.upload_picture()
        self.assertEqual(uploaded_without_picture, "Picture not uploaded.")

    def test_upload_with_picture(self):
        self.nutrition_tracker.take_picture()
        uploaded_with_picture = self.nutrition_tracker.upload_picture()
        self.assertEqual(uploaded_with_picture, "Picture uploaded successfully.")

    def test_enable_diabetes_mode(self):
        enabled_diabetes = self.nutrition_tracker.enable_diabetes_mode()
        self.assertEqual(enabled_diabetes, "Diabetes mode enabled. Please refer to our nutrition guide.")
        self.assertTrue(self.nutrition_tracker.is_diabetic)

    def test_check_diabetes_mode_not_enabled(self):
        check_diabetes = self.nutrition_tracker.check_diabetes(3)
        self.assertEqual(check_diabetes, "Diabetes mode is not enabled.")

    def test_check_diabetes_safe_food(self):
        self.nutrition_tracker.enable_diabetes_mode()
        check_safe_food = self.nutrition_tracker.check_diabetes(3)
        self.assertEqual(check_safe_food, "This food is safe for diabetics. It has low sugar content.")

    def test_check_diabetes_high_sugar(self):
        self.nutrition_tracker.enable_diabetes_mode()
        check_high_sugar = self.nutrition_tracker.check_diabetes(11)
        self.assertEqual(check_high_sugar, "Warning: Sugar levels exceed 10 grams, not recommended to eat.")

if __name__ == '__main__':
    unittest.main()
