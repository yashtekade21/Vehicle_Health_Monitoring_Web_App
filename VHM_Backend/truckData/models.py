from django.db import models

class Truck(models.Model):
    # Field to store the model name of the truck
    # It is a CharField with a maximum length of 100 characters
    model_name = models.CharField(max_length=100)
    
    # Field to store the truck's registration number or plate
    # It is a CharField with a maximum length of 20 characters
    number_plate = models.CharField(max_length=20)
    
    # Field to store the name of the driver assigned to the truck
    # It is a CharField with a maximum length of 100 characters
    assigned_driver = models.CharField(max_length=100)

    def __str__(self):
        # This method returns a human-readable string representation of the Truck instance
        # It combines the model_name and number_plate for a more descriptive output
        return f"{self.model_name} - {self.number_plate}"
