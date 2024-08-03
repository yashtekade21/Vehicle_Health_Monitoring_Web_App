from rest_framework import serializers
from .models import Truck

class TruckSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model that this serializer will handle
        model = Truck
        
        # Include all fields from the Truck model in the serialized representation
        fields = '__all__'
