from rest_framework import viewsets
from .models import Car
from .serializers import CarSerializer

class CarViewSet(viewsets.ModelViewSet):
    # Define the queryset that this view will operate on
    queryset = Car.objects.all()
    
    # Specify the serializer class used to serialize and deserialize Car instances
    serializer_class = CarSerializer
