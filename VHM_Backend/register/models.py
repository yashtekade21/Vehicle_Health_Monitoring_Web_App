from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    # Create a one-to-one relationship with the User model
    # This ensures that each User has exactly one UserProfile
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    # Field to store the age of the user
    age = models.IntegerField()
    
    # Field to store the contact number of the user
    contact_no = models.CharField(max_length=15)
    
    # Field to store the license number of the user
    license_no = models.CharField(max_length=50)
    
    # Field to store the address of the user
    address = models.CharField(max_length=255)

    def __str__(self):
        # This method returns a human-readable string representation of the UserProfile instance
        # It uses the username of the associated User
        return self.user.username
    
    def get_email(self, obj):
        # This method retrieves the email address of the associated User
        # It is not typically used in a model but might be used in a serializer or view
        return obj.user.email
    

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    # This signal receiver creates a UserProfile instance whenever a new User is created
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    # This signal receiver ensures that the UserProfile is saved whenever the User is saved
    # This is important for updating the UserProfile if it already exists
    instance.userprofile.save()
