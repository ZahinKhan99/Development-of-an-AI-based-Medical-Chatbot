export interface UserType {
  id: string;
  name: string;
  phone: string;
  email: string;
  password?: string;
  age: number | null;
  blood_group: string;
  user_id?: string,
  speciality?: string,
  date_of_joining?: string
  user_type?: string,
  department?: number,
}

export interface BCUserReturnType {
  id: string;
  hash: string;
  u_type: number;
  password: string;
  active: boolean;
}

// class Patient(models.Model):
// id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
// user_id = models.ForeignKey(User, on_delete=models.CASCADE)
// name = models.CharField(max_length=255)
// email = models.EmailField(unique=True)
// phone = models.CharField(max_length=255)
// age = models.IntegerField()
// blood_group = models.CharField(max_length=2)
//
// def __str__(self):
// return self.name
//
//
// class Doctor(models.Model):
// id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
// user_id = models.ForeignKey(User, on_delete=models.CASCADE)
// name = models.CharField(max_length=255)
// email = models.EmailField(unique=True)
// phone = models.CharField(max_length=255)
// image = models.ImageField(upload_to='images/doctors/', name=id.name, blank=True, null=True)
// speciality = models.CharField(max_length=255)
// date_of_joining = models.DateField()
