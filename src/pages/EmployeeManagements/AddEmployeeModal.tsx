import z from 'zod'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { CreateEmployee } from '../../types'
import { capitalizeFirstLetter, createEmployee } from '../../utils'
import { Button, FormField, InputTag } from '../../components/common'

type TypeAddEmployeeModalProps = {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

export const DEPARTMENTS = [
  'Finance',
  'Human Resources',
  'IT Development',
  'Marketing',
  'Operations',
]

const employeeSchema = z.object({
  age: z
    .number({ message: 'Age must be a number and cannot be empty.' })
    .min(20, { message: 'Age must be at least 20.' })
    .max(40, { message: 'Age must be no more than 40.' }),
  department: z.string().min(1, 'Department is required.'),
  gender: z
    .union([z.string('male'), z.string('female')])
    .refine((val) => val === 'male' || val === 'female', {
      message: 'Invalid gender selection.',
    }),
  hobby: z
    .array(z.string().trim())
    .min(1, { message: 'Hobby must have at least 1 item.' })
    .max(5, { message: 'Hobby must have no more than 5 items.' }),
  name: z.string().trim().min(1, 'Name is required.').max(80, 'Max 80 characters'),
})

const AddEmployeeModal = (props: TypeAddEmployeeModalProps) => {
  const { open, onClose, onCreated } = props

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: { name: '', department: '', gender: 'male', hobby: [] },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createEmployee,
    onError: (err) => {
      toast.error(`${err}`, { autoClose: 3000 })
    },
    onSuccess: () => {
      toast.success('New employee data added.', { autoClose: 3000 })
      onCreated()
      handleCloseModal()
      reset()
    },
  })

  const onSubmit = async (data: z.infer<typeof employeeSchema>) => {
    const submittedData = {
      ...data,
      hobby: data.hobby.join(','),
      gender: data.gender as CreateEmployee['gender'],
    }

    mutate(submittedData)
  }

  const handleCloseModal = () => {
    onClose()
    reset()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        aria-label="Close modal"
        onClick={handleCloseModal}
        className="absolute inset-0 bg-black/30"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 min-w-80 max-w-lg w-full rounded-lg bg-gray-100 shadow-xl overflow-hidden border-2 border-gray-400"
      >
        <h2 className="text-xl font-black bg-sage-100 flex justify-center items-center py-4 border-b-2 border-gray-400 text-slate-800">
          Add New Employee
        </h2>

        <div className="px-8 py-8">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <FormField
              required
              htmlFor="name"
              label="Full Name"
              error={errors.name?.message}
            >
              <input
                id="name"
                {...register('name')}
                placeholder="Example: Kira Takada"
                className="w-full rounded-lg border border-gray-500 px-3 py-2 outline-none focus:ring-1 focus:ring-slate-400 text-sm sm:text-base bg-gray-100 font-normal"
              />
            </FormField>

            {/* Gender */}
            <FormField
              required
              as="fieldset"
              label="Gender"
              error={errors.gender?.message}
            >
              <div className="flex flex-wrap gap-3">
                {(['male', 'female'] as const).map((opt) => (
                  <label key={opt} className="inline-flex items-center gap-2 rounded-lg text-sm sm:text-base">
                    <input
                      type="radio"
                      value={opt}
                      {...register('gender')}
                      className="h-4 w-4 accent-slate-700"
                    />
                    <span className="text-sm sm:text-base">{capitalizeFirstLetter(opt)}</span>
                  </label>
                ))}
              </div>
            </FormField>

            {/* Age */}
            <FormField
              htmlFor="age"
              label="Age (Years)"
              error={errors.age?.message}
              required
            >
              <input
                id="age"
                type="number"
                inputMode="numeric"
                placeholder="Example: 32"
                {...register('age', { valueAsNumber: true })}
                className="w-full rounded-lg border border-gray-500 px-3 py-2 outline-none focus:ring-1 focus:ring-slate-400 text-sm sm:text-base bg-gray-100 font-normal"
              />
            </FormField>

            {/* Hobbies */}
            <FormField
              required
              label="Hobby"
              htmlFor="hobby"
              error={errors.hobby?.message}
            >
              <Controller
                name="hobby"
                control={control}
                render={({ field }) => (
                  <InputTag name="hobby" value={field.value} onChange={field.onChange} />
                )}
              />
            </FormField>

            {/* Department */}
            <FormField
              required
              label="Department"
              htmlFor="department"
              error={errors.department?.message}
            >
              <select
                id="department"
                defaultValue=""
                {...register('department')}
                className="w-full rounded-lg border border-gray-400 px-3 py-2 outline-none focus:ring-1 focus:ring-slate-400 bg-gray-100 font-normal text-sm sm:text-base"
              >
                <option value="" disabled>
                  -- Select Department --
                </option>
                {DEPARTMENTS.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Actions */}
            <div className="flex justify-between gap-4 mt-1">
              <Button variant="cancel" type="button" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="save" type="submit" disabled={isPending}>
                {isPending ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEmployeeModal
