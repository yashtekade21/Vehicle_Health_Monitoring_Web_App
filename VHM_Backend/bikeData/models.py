from django.db import models

class Bike(models.Model):
    # The 'model_name' field stores the name or model of the bike.
    # It is a CharField with a maximum length of 255 characters.
    model_name = models.CharField(max_length=255)
    
    # The 'number_plate' field stores the registration number of the bike.
    # It is a CharField with a maximum length of 255 characters.
    number_plate = models.CharField(max_length=255)
    
    # The 'assigned_driver' field stores the name of the driver assigned to the bike.
    # It is a CharField with a maximum length of 255 characters.
    assigned_driver = models.CharField(max_length=255)

    def __str__(self):
        # This method returns a human-readable string representation of the Bike instance.
        # It returns the 'model_name' field value.
        return self.model_name
