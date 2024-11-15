# Jonathan Kwon
# USER STORY 3 - DIABETICS
# "I pledge my honor that I have abided by the Stevens Honor System."
# This code includes features for diabetic users, such as warnings for high sugar content and healthy eating tips.
import unittest

class NutritionTracker:
    def __init__(self):
        self.picture_taken = False
        self.is_diabetic = False

    def take_picture(self):
        self.picture_taken = True
        return "Picture taken successfully."

    def upload_picture(self):
        if self.picture_taken:
            return "Picture uploaded successfully."
        else:
            return "Picture not uploaded."

    def enable_diabetes_mode(self):
        self.is_diabetic = True
        return "Diabetes mode enabled. Please refer to our nutrition guide."

    def check_diabetes(self, sugar_content):
        if not self.is_diabetic:
            return "Diabetes mode is not enabled."

        if sugar_content > 10:  #MEASURE SUGAR IN GRAMS.
            return ("Warning: Sugar levels exceed 10 grams, not recommended to eat.")
        else:
            return "This food is safe for diabetics. It has low sugar content."

    def diabetic_tips(self):
        if not self.is_diabetic:
            return "Diabetes mode is not enabled."

        #Nutrition guide
        nutrition_guide = (
            "**WATCHOUT FOR THESE NUTRIENTS!**\n"
            "Sugar: Male - 36 grams || Female - 25 grams. Try not to exceed these levels.\n"
            "Carbohydrates: 130-180 grams per day. Try not to exceed these levels.\n"
            "Fats: *AVOID* unhealthy saturated fats & trans fat such as red meat, butter, and fried foods such as french fires.\n"
            "Sodium: Intake should be less than 2,300 mg/day.\n"
            
            "**INCREASE INTAKE FOR THESE NUTRIENTS & VITAMINS!**\n"
            "Fiber Recommended Intake: Aim for atleast 25-30 grams of fiber per day! (Slows down absorbtion of sugar)\n" 
            "Protein Recommended Intake: Try to consume protein heavy foods such as lean meats, fish, tofu, eggs, and greek yogurt to name a few! (Protein does not raise blood sugar levels and helps control carbohydrate intake and stabilizie blood glucose)\n"
            "Magnesium: Low magnesium levels are associated to poor blood sugar control. Magnesium helps iwth insulin sensitivity and glucose regulation!\n"
            "Chromium: Enhances the action of insulin and improves blood sugar control!\n"
            "Vitamin D: Helps the body use insulin effectively. Lower vitamin D levels are associated wih higher blood sugar levels which is BAD!\n"
            "Antioxidants: Vitamins such as Vitamin C & E will help reduce oxidative stress, which is higher in individuals with diabities."
        )
        return nutrition_guide


