from rest_framework import viewsets
from rest_framework import generics
from .models import Bike
from .serializers import BikeSerializer, UserSerializer
from register.models import User

# ViewSet for handling CRUD operations on the Bike model
class VehicleViewSet(viewsets.ModelViewSet):
    # Define the queryset that this view will operate on
    queryset = Bike.objects.all()
    
    # Specify the serializer class used to serialize and deserialize Bike instances
    serializer_class = BikeSerializer

# API view for listing all bikes and creating a new bike
class BikeListCreateAPIView(generics.ListCreateAPIView):
    # Define the queryset that this view will operate on
    queryset = Bike.objects.all()
    
    # Specify the serializer class used to serialize and deserialize Bike instances
    serializer_class = BikeSerializer

# API view for retrieving, updating, or deleting a specific bike by its primary key
class BikeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    # Define the queryset that this view will operate on
    queryset = Bike.objects.all()
    
    # Specify the serializer class used to serialize and deserialize Bike instances
    serializer_class = BikeSerializer

# API view for listing all users
class UserListAPIView(generics.ListAPIView):
    # Define the queryset that this view will operate on
    queryset = User.objects.all()
    
    # Specify the serializer class used to serialize and deserialize User instances
    serializer_class = UserSerializer
